import { observable, makeObservable, action, computed } from 'mobx';
class ServicesStore {
  services
    = [
      {
        price: "30 ש'ח",
        name: "נסיעה עירונית",
        description: "בכל האיזורים בעיר",

      },

      {
        price: "100 ש'ח",
        name: "נסיעה בין עירונית",
        description: "בכל האיזורים בארץ",

      },

      {
        price: "200 ש'ח",
        name: "הסעות לאירועים",
        description: "התאמת האוירה לצרכי הקבוצה",
      }, {
        name: "הסעות לנתב'ג",
        description: "חסכון בהסתבכות עם מקום חניה ובעיות של זמנים",
        price: "150 ש'ח",
      }
    ]
  details =
    {
      name: "driver",
      address: "אלי כהן 9 | בתים",
      phone: "073-333-3333",
      owner: "מיסטר כהן",
      description: "שירות הסעות בפריסה ארצית"

    }

  orders = []


  constructor() {
    makeObservable(this,
      {
        details: observable,
        services: observable,
        addService: action,
        initialServices: action,
        setDetails: action,
        updateDetails: action,
        initialDetails: action,
        orders: observable,
        postOrders: action,
        getOrders: action,
        insertServices: action,
      }

    )



    const fetchBusinessDataExists = async () => {
      const bus = await this.initialDetails();
      if (Object.keys(bus).length === 0) {
        this.updateDetails(this.details);
      }
      else {
        this.details = bus;
      }
    }
    fetchBusinessDataExists();

    const fetchServicesExists = async () => {
      const ser = await this.initialServices();
      if (ser.length === 0) {
        this.services.forEach((service) => this.insertServices(service));
      }
      else {
        this.services = ser;
      }
    }
    fetchServicesExists();

  }

  insertServices = async (newService) => {
    const response = await fetch("http://localhost:8787/service", {
      method: "POST",
      body: JSON.stringify(newService),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      console.log(this.services)
      return
    }
    return
  }
  addService = async (newService) => {
    const response = await fetch("http://localhost:8787/service", {
      method: "POST",
      body: JSON.stringify(newService),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      this.services = ([...this.services, newService])
      console.log(this.services)
      return
    }
    return

  }

  initialServices = async () => {

    const response = await fetch("http://localhost:8787/services");
    const data = await response.json();
    return data;
  }
  setDetails = async (details) => {
    const response = await fetch("http://localhost:8787/businessData", {
      method: "PUT",
      body: JSON.stringify(details),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      this.details = details;
    }
  };

  updateDetails = async (details) => {
    const response = await fetch("http://localhost:8787/businessData", {
      method: "POST",
      body: JSON.stringify(details),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      this.details = details;
    }
  };

  initialDetails = async () => {
    const response = await fetch("http://localhost:8787/businessData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      const business = await response.json();
      return business;
    } else {
      return null;
    }
  };

  getOrders = async () => {

    const response = await fetch("http://localhost:8787/appointments");
    const data = await response.json();
    const sortedData = [...data].sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
    this.orders = sortedData;
    console.log(this.orders.length === 0 ? "null" : "yes");
  }

  postOrders = async (ord) => {
    let order = {
      name: ord["username"],
      identity: ord["identity"],
      type: ord["type"],
      dateTime: ord["deliveryDate"],
      email: ord["email"],
      phone: ord["phone"],
      address: ord["address"]
    }
    const responses = await fetch("http://localhost:8787/appointment", {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (responses.status === 200) {
      this.orders = ([...this.orders, order]);

    }
    console.log(this.orders)
  }
}
export default new ServicesStore();