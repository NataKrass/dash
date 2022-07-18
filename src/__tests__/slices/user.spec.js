import reducer, { initialState, increment } from 'store/slices/user';


describe('user slice', () => {
  describe('reducer, actions and selectors', () => {
    it('should return the initial state on first run', () => {
      const nextState = initialState;
      const result = reducer(undefined, {});

      expect(result).toEqual(nextState);
    });
    it('should properly increment count in the state', () => {
      const nextState = reducer(initialState, increment());
      const rootState = { count: 1 };
      expect(nextState.count).toEqual(rootState.count);
    });
  });
});
