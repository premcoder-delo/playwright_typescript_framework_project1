import { test as baseTest } from './pom-fixture';
import CommonUtils from '../utils/CommonUtils';
import CommonAPIUtils from '../utils/CommonAPIUtils';

/**
 * Below fixture is for encryption and decryption related
 */

type CommonFixtureType = {
    commonUtils: CommonUtils
    commonAPIUtils: CommonAPIUtils
}

export const test = baseTest.extend<CommonFixtureType>({
    commonUtils: async ({ }, use) => {
        use(new CommonUtils())
    },
    commonAPIUtils: async ({ request }, use) => {
        use(new CommonAPIUtils(request))
    }
})