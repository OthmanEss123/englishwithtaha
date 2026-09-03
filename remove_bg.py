import cv2
import numpy as np
from PIL import Image
from scipy.spatial import cKDTree

def remove_background_and_crop(input_path, output_path):
    img = cv2.imread(input_path)
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB).astype(np.float32)
    h, w, _ = img.shape
    
    # 1. Connected Component / FloodFill background mask from edges
    is_white = np.all(img_rgb >= 250.0, axis=2).astype(np.uint8)
    
    flood_mask = np.zeros((h + 2, w + 2), dtype=np.uint8)
    bg_mask = np.zeros((h, w), dtype=np.uint8)
    
    for x in range(w):
        if is_white[0, x] and not bg_mask[0, x]:
            cv2.floodFill(is_white, flood_mask, (x, 0), 2)
        if is_white[h-1, x] and not bg_mask[h-1, x]:
            cv2.floodFill(is_white, flood_mask, (x, h-1), 2)
    for y in range(h):
        if is_white[y, 0] and not bg_mask[y, 0]:
            cv2.floodFill(is_white, flood_mask, (0, y), 2)
        if is_white[y, w-1] and not bg_mask[y, w-1]:
            cv2.floodFill(is_white, flood_mask, (w-1, y), 2)
            
    bg_mask = (is_white == 2).astype(np.uint8) * 255
    raw_fg = (bg_mask == 0).astype(np.uint8) * 255
    
    # 2. Trimap generation
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    definite_fg = cv2.erode(raw_fg, kernel, iterations=2)
    definite_bg = cv2.dilate(bg_mask, kernel, iterations=1)
    
    fg_y, fg_x = np.where(definite_fg > 0)
    fg_coords = np.column_stack([fg_y, fg_x])
    fg_colors = img_rgb[fg_y, fg_x]
    
    unknown_mask = (definite_fg == 0) & (definite_bg < 255)
    unk_y, unk_x = np.where(unknown_mask)
    
    tree = cKDTree(fg_coords)
    _, nearest_idx = tree.query(np.column_stack([unk_y, unk_x]))
    
    nearest_F = fg_colors[nearest_idx]
    observed_C = img_rgb[unk_y, unk_x]
    
    B = np.array([255.0, 255.0, 255.0], dtype=np.float32)
    V = nearest_F - B
    U = observed_C - B
    
    dot_uv = np.sum(U * V, axis=1)
    dot_vv = np.sum(V * V, axis=1) + 1e-6
    alpha = np.clip(dot_uv / dot_vv, 0.0, 1.0)
    alpha[alpha < 0.08] = 0.0
    
    alpha_expanded = alpha[:, np.newaxis]
    unmixed = (observed_C - (1.0 - alpha_expanded) * B) / np.maximum(alpha_expanded, 0.1)
    unmixed = np.clip(unmixed, 0.0, 255.0)
    
    blend_weight = np.clip((alpha_expanded - 0.08) / 0.25, 0.0, 1.0)
    clean_F = blend_weight * unmixed + (1.0 - blend_weight) * nearest_F
    
    # Base RGBA before color grading
    base_rgb = np.zeros_like(img_rgb)
    base_alpha = np.zeros((h, w), dtype=np.float32)
    
    base_rgb[definite_fg > 0] = img_rgb[definite_fg > 0]
    base_alpha[definite_fg > 0] = 1.0
    
    base_rgb[unk_y, unk_x] = clean_F
    base_alpha[unk_y, unk_x] = alpha
    
    # 4. Professional Studio Lighting & Color Grading
    c_norm = base_rgb / 255.0
    
    # Lift midtones with gamma curve
    gamma = 0.73
    c_lifted = np.power(c_norm, gamma)
    
    # Exposure boost (+18%)
    c_lifted = c_lifted * 1.18
    
    # Punchy contrast around anchor 0.38
    c_contrast = 0.38 + (c_lifted - 0.38) * 1.14
    c_contrast = np.clip(c_contrast * 255.0, 0, 255).astype(np.uint8)
    
    # Vibrant, warm skin tone enhancement
    hsv = cv2.cvtColor(c_contrast, cv2.COLOR_RGB2HSV).astype(np.float32)
    hsv[:, :, 1] = np.clip(hsv[:, :, 1] * 1.22, 0, 255)
    c_warm = cv2.cvtColor(hsv.astype(np.uint8), cv2.COLOR_HSV2RGB).astype(np.float32) / 255.0
    
    # Studio unsharp mask (clarity & sharpness)
    blurred = cv2.GaussianBlur(c_warm, (0, 0), 1.6)
    c_sharp = cv2.addWeighted(c_warm, 1.38, blurred, -0.38, 0)
    c_final = np.clip(c_sharp * 255.0, 0, 255).astype(np.uint8)
    
    final_rgba = np.dstack([c_final, (base_alpha * 255.0).astype(np.uint8)])
    
    pil_img = Image.fromarray(final_rgba, mode='RGBA')
    bbox = pil_img.getbbox()
    if bbox:
        cropped = pil_img.crop(bbox)
    else:
        cropped = pil_img
        
    cropped.save(output_path, "PNG")
    print(f"Saved studio matting cutout with lighting grade: size={cropped.size} to {output_path}")

if __name__ == "__main__":
    remove_background_and_crop("public/images/Design sans titre.png", "public/images/taha_clean.png")
    remove_background_and_crop("public/images/Design sans titre.png", "public/images/taha.png")
