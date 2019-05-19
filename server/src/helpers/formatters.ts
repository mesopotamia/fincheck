import * as numeral from 'numeral';

export default {
    convertToNumber: (value) => {
        return numeral(value).value();
    },
    convertToCurrency: (value) => {
        return numeral(value).format('($0,0)');
    }
}