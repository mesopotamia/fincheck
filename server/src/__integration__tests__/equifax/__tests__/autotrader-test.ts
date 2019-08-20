import {init} from "../../../index";
import {actions, extractor} from "../fixtures/autotrader/multiple-listings-config";
import {extract} from "../../../helpers/extraction";
import {executeActions} from "../../../helpers/actions";

test('get multiple listing', async () => {
    const page = await init(true);
    await executeActions(page, actions);
    const result = await extract(page, extractor) as string;
    expect(result).toEqual(["2018 Mercedes-Benz G550 4x42 SUV -RARE-",
        "2018 Mercedes-Benz G-Class G550 4x4 Squared",
        "2019 Mercedes-Benz G-Class",
        "2019 Mercedes-Benz G-Class 550 * LEASE $995 LEASE *",
        "2019 Mercedes-Benz G63 AMG AWD|Leather|360Cam|Navi|BT|Sunroof",
        "2018 Mercedes-Benz G63 AMG SUV 20 Matte Black Wheels," +
        " Bull Bar," +
        " Designo Leath",
        "2018 Mercedes-Benz G-Class 2018 Mercedes-Benz G-Class - AMG G 63 4MATIC SUV",
        "2018 Mercedes-Benz G-Class G 550 4x4 Squared SUV",
        "2018 Mercedes-Benz G550 4X4 SQUARED",
        "2018 Mercedes-Benz G550 4x42 SUV -RARE-",
        "2018 Mercedes-Benz G-Class G550 4x4 Squared",
        "2018 Mercedes-Benz G-Class G550 4x4 Squared",
        "2019 Mercedes-Benz G63 AMG",
        "2019 Mercedes-Benz G63 AMG SUV Low Mileage," +
        " no Accidents",
        "2019 Mercedes-Benz G63 AMG AWD|Leather|360Cam|Navi|BT|Sunroof",
        "2019 Mercedes-Benz G550 AMG|MAGNO PAINT|DESIGNO|MASSAGE|360|DISTRONIC|LOAD",
        "2019 Mercedes-Benz G-Class 550 * LEASE $995 LEASE *",
        "2018 Mercedes-Benz G63 AMG",
        "2018 Mercedes-Benz G-Class G63 AMG",
        "2018 Mercedes-Benz G-Class AMG G 63 4MATIC SUV",
        "2018 Mercedes-Benz G63 AMG SUV 20 Matte Black Wheels," +
        " Bull Bar," +
        " Designo Leath",
        "2018 Mercedes-Benz G-Class Low Kms G 63 AMG V8 Bi Turbo 4Matic Two Tone Inter"])
}, 15000);
