import API from "./api";

const discountService = {
  loadDiscounts: () => {
    return API.get(`Discounts`);
  },

  changeDiscount: (newValue, type) => {
    var body = {
      Value: newValue,
      Type: type,
    };

    return API.put(`Discounts`, body);
  },
};

export default discountService;
