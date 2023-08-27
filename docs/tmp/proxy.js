let user = {
    _name: "Guest",
    get name() {
      console.log(this)    
      return this._name;
    }
  };
  
  let userProxy = new Proxy(user, {
    get(target, prop, receiver) {
        alert(receiver)
      return target[prop]; // (*) target = user
    }
  });
  
  let admin = {
    __proto__: userProxy,
    _name: "Admin"
  };

  // 期望输出：Admin
  console.log(admin.name); // 输出：Guest (?!?)