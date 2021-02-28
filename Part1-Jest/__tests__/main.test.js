const formatVolumeIconPath = require('../assets/scripts/main');


describe('Volume icon', () => {
    test('is mute', () => {
      expect(formatVolumeIconPath(0)).toContain(0);
    });
    test('is 1', () => {
        expect(formatVolumeIconPath(33)).toContain(1);
      });
    test('is 2', () => {
        expect(formatVolumeIconPath(66)).toContain(2);
    });
    test('is 3', () => {
        expect(formatVolumeIconPath(100)).toContain(3);
    });
});