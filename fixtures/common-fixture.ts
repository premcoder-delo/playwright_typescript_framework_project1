import { test as baseTest } from './pom-fixture';
import CommonUtils from '../utils/CommonUtils';

/**
 * Below fixture is for encryption and decryption related
 */

type CommonFixtureType = {
    commonUtils: CommonUtils
}

export const test = baseTest.extend<CommonFixtureType>({
    commonUtils: async ({ }, use) => {
        use(new CommonUtils())
    }
})