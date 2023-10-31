import servicesReducer from "./services.reducer";

describe("testing our servicesReducer", () => {
    it("should have its correct initial state", () => {
      let action = {};
      let returnedState = servicesReducer(undefined, action);
  
      expect(returnedState).toEqual([]);
    });
  
    test("should have its correct returned state with action.type 'SET_SERVICES'", () => {
      let action = { type: 'SET_SERVICES' };
      let returnedState = servicesReducer(undefined, action);
      console.log("returned state", returnedState)
  
      expect(returnedState).toEqual(undefined);
    });
  
  });