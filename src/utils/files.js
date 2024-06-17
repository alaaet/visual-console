function isPathAbsolute(path) {
    return /^(?:\/|[a-z]+:\/\/)/.test(path);
  }

  export{
    isPathAbsolute
  }