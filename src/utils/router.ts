export const isWebView = () => {
  const ua = navigator.userAgent || navigator.vendor;
  return /wv|Android.*Version\/\d+\.\d+/i.test(ua);
};