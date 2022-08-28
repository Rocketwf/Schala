import { describe, it, jest } from '@jest/globals';

describe('Filter Box Tests', () =>
{
    it('mounts without errors', () =>
    {
        jest.mock('/schala-gui/src/boot/apexcharts', () => ({
            default: {
                app: jest.fn().mockReturnValue(true)
            }
        }));
    });
});
