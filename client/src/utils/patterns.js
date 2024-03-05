const passwordMinLength = 8;
const passwordMaxLength = 20;

const patterns = {
  passwordMinLength,
  passwordMaxLength,
  urlPattern: /(?:https?:\/\/)?(?:www\.)?(?:[-a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,}(?:\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?/,
  emailPattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  passwordPattern: new RegExp(
    `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-=\\{\\}|;':",<.>/?])[a-zA-Z0-9!@#$%^&*()_+\\-=\\{\\}|;':",<.>/?]{${passwordMinLength},${passwordMaxLength}}$`
  ),
  youtubePattern: /^(https?:\/\/)?(www\.)?(youtube)\.com\/@([\w-]+)$/i,
  instgramPattern: /^(?:https?:\/\/(?:www\.)?(instagram)\.com\/)([\w-]+)$/i,
  snapchatPattern: /^(?:https?:\/\/(?:www\.)?(snapchat)\.com\/add\/)([\w-]+)$/i,
  facebookPattern: /^(?:https?:\/\/(?:www\.)?(facebook)\.com\/)([\w-]+)$/i,
  tiktokPattern: /^(https?:\/\/)?(www\.)?(tiktok)\.com\/@([\w-]+)$/i,
  XPattern: /^(?:https?:\/\/(?:www\.)?(X)\.com\/)([\w-]+)$/i,
  platformsPattern: /^(?:(?:https?:\/\/)?(?:www\.))?(?<platform>(?:youtube)|(?:snapchat)|(:?tiktok)|(?:facebook)|(?:instagram)|(?:X)).com\/@?(?<username>[\w-]+)$/,
  // socialMediaPattern: RegExp(`${this.youtubePattern}|${this.instgramPattern}|${this.snapchatPattern}|${this.tiktokPattern}|${this.facebookPattern}|${this.XPattern}}`)
};

export default patterns;