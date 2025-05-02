export const getAverageColor = (imageElement: HTMLImageElement): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (!context) {
      resolve('rgb(243, 244, 246)'); // Default color if canvas is not supported
      return;
    }

    // Set canvas size to a small value for performance
    canvas.width = 50;
    canvas.height = 50;

    // Draw and get image data
    context.drawImage(imageElement, 0, 0, 50, 50);
    const imageData = context.getImageData(0, 0, 50, 50).data;

    let r = 0, g = 0, b = 0, count = 0;

    // Sample pixels at intervals
    for (let i = 0; i < imageData.length; i += 16) {
      r += imageData[i];
      g += imageData[i + 1];
      b += imageData[i + 2];
      count++;
    }

    // Calculate average
    r = Math.round(r / count);
    g = Math.round(g / count);
    b = Math.round(b / count);

    // Adjust brightness and saturation
    const brightness = (r + g + b) / 3;
    const targetBrightness = 200; // Aim for a lighter color
    const factor = targetBrightness / (brightness || 1);

    r = Math.min(255, Math.round(r * factor * 0.9));
    g = Math.min(255, Math.round(g * factor * 0.9));
    b = Math.min(255, Math.round(b * factor * 0.9));

    resolve(`rgb(${r}, ${g}, ${b})`);
  });
}; 