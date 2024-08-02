import axiosInstance from "./axios-config";
import ApiResponse from "./api-response";

const asyncWrapper = async (apiCall) => {
  try {
    const response = await apiCall();
    return new ApiResponse(true, response.data.result);
  } catch (error) {
    console.error("Error during donation process:", error);
    return new ApiResponse(false, null, error.message);
  }
};

export const createCheckoutSession = async (amount) => {
  return await asyncWrapper(() =>
    axiosInstance.post("/stripe/sessions", {
      price: amount,
      quantity: 1,
      name: "Donation",
    })
  );
};