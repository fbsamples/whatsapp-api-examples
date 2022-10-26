/* Copyright (c) Meta Platforms, Inc. and affiliates.
* All rights reserved.
*
* This source code is licensed under the license found in the
* LICENSE file in the root directory of this source tree.
*/

exports.validateMediaSize = (size, type) => {
  let typeSplit = type?.split("/");
  switch (typeSplit[0]) {
    case `audio`:
      if (size > 16000000) return false;
      else return true;
    case `video`:
      if (size > 16000000) return false;
      else return true;
    case `image`:
      if (size > 5000000 && (typeSplit[1] === "jpeg" || typeSplit[1] === "png"))
        return false;
      else if (size > 100000 && typeSplit[1] === "webp") return false;
      else return true;
    case `text`:
      if (size > 100000000) return false;
      else return true;
    case `application`:
      if (size > 100000000) return false;
      else return true;
    default:
      return true;
  }
};

exports.mediaLimits = (type) => {
  let typeSplit = type?.split("/");
  switch (typeSplit[0]) {
    case "audio":
      return "16MB";
    case "video":
      return "16MB";
    case "image":
      if (typeSplit[1] === "jpeg" || typeSplit[1] === "png") return "5MB";
      else return "100KB";
    case "text":
      return "100MB";
    case "pdf":
      return "100MB";
    default:
      return "";
  }
};
