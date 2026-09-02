from PIL import Image, ImageFilter
from collections import deque

def remove_background_and_crop(input_path, output_path, tolerance=25):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()
    
    visited = [[False] * height for _ in range(width)]
    mask = Image.new("L", (width, height), 255)
    mask_pixels = mask.load()
    
    queue = deque()
    
    def is_bg(x, y):
        r, g, b, a = pixels[x, y]
        return r >= (255 - tolerance) and g >= (255 - tolerance) and b >= (255 - tolerance)
    
    # Check all border pixels
    for x in range(width):
        for y in [0, height - 1]:
            if is_bg(x, y):
                queue.append((x, y))
                visited[x][y] = True
                mask_pixels[x, y] = 0
                
    for y in range(height):
        for x in [0, width - 1]:
            if not visited[x][y] and is_bg(x, y):
                queue.append((x, y))
                visited[x][y] = True
                mask_pixels[x, y] = 0
                
    # BFS
    while queue:
        cx, cy = queue.popleft()
        
        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1), (-1, -1), (1, 1), (-1, 1), (-1, -1)]:
            nx, ny = cx + dx, cy + dy
            if 0 <= nx < width and 0 <= ny < height and not visited[nx][ny]:
                if is_bg(nx, ny):
                    visited[nx][ny] = True
                    mask_pixels[nx, ny] = 0
                    queue.append((nx, ny))

    # Apply alpha mask
    img.putalpha(mask)
    
    # Find bounding box
    bbox = img.getbbox()
    if bbox:
        # Crop directly to bounding box with 0 padding at bottom for clean baseline
        cropped = img.crop(bbox)
    else:
        cropped = img
        
    cropped.save(output_path, "PNG")
    print(f"Saved cleanly cropped transparent PNG: size={cropped.size} to {output_path}")

if __name__ == "__main__":
    remove_background_and_crop("public/images/Design sans titre.png", "public/images/taha.png", tolerance=22)
