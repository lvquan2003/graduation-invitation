const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export default {
  output: "export",          // xuất web tĩnh cho GitHub Pages
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
};
