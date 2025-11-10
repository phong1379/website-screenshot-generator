onst defaults = require('../src/config/defaults.json');

describe('Defaults Config', () => {
  test('should have all required fields', () => {
    expect(defaults).toHaveProperty('waitUntil');
    expect(defaults).toHaveProperty('delay');
    expect(defaults).toHaveProperty('viewportWidth');
    expect(defaults).toHaveProperty('scrollToBottom');
    expect(defaults).toHaveProperty('delayAfterScrolling');
    expect(defaults).toHaveProperty('waitUntilNetworkIdleAfterScroll');
    expect(defaults).toHaveProperty('waitUntilNetworkIdleAfterScrollTimeout');
  });
});