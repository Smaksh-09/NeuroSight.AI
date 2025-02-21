self.addEventListener("push", (event) => {
    //@ts-ignore
    const data = event.data.json();
    //@ts-ignore
    self.registration.showNotification(data.title, { body: data.body });
  });