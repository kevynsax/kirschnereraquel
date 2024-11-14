export interface PixPayload{
    pixKey: string;
    description: string;
    merchantName: string;
    merchantCity: string;
    txId: string;
    amount: number;
}

export default class Pix {
    private readonly ID_PAYLOAD_FORMAT_INDICATOR = "00";
    private readonly ID_MERCHANT_ACCOUNT_INFORMATION = "26";
    private readonly ID_MERCHANT_ACCOUNT_INFORMATION_GUI = "00";
    private readonly ID_MERCHANT_ACCOUNT_INFORMATION_KEY = "01";
    private readonly ID_MERCHANT_ACCOUNT_INFORMATION_DESCRIPTION = "02";
    private readonly ID_MERCHANT_CATEGORY_CODE = "52";
    private readonly ID_TRANSACTION_CURRENCY = "53";
    private readonly ID_TRANSACTION_AMOUNT = "54";
    private readonly ID_COUNTRY_CODE = "58";
    private readonly ID_MERCHANT_NAME = "59";
    private readonly ID_MERCHANT_CITY = "60";
    private readonly ID_ADDITIONAL_DATA_FIELD_TEMPLATE = "62";
    private readonly ID_ADDITIONAL_DATA_FIELD_TEMPLATE_TXID = "05";
    private readonly ID_CRC16 = "63";

    constructor(private readonly payload: PixPayload) {
    }

    private get pixKey(): string{
        return this.payload.pixKey;
    }

    private get description(): string{
        return this.payload.description;
    }

    private get merchantName(): string{
        return this.payload.merchantName;
    }

    private get merchantCity(): string{
        return this.payload.merchantCity;
    }

    private get txId(): string{
        return this.payload.txId;
    }

    private get amount(): string{
        return this.payload.amount.toString();
    }

    private _getValue(id: string, value: string): string {
        const size = String(value.length).padStart(2, "0");
        return id + size + value;
    }

    private _getMerchantAccountInfo() {
        const gui = this._getValue(
            this.ID_MERCHANT_ACCOUNT_INFORMATION_GUI,
            "br.gov.bcb.pix"
        );
        const key = this._getValue(
            this.ID_MERCHANT_ACCOUNT_INFORMATION_KEY,
            this.pixKey
        );
        const description = this._getValue(
            this.ID_MERCHANT_ACCOUNT_INFORMATION_DESCRIPTION,
            this.description
        );

        return this._getValue(
            this.ID_MERCHANT_ACCOUNT_INFORMATION,
            gui + key + description
        );
    }

    _getAdditionalDataFieldTemplate() {
        const txId = this._getValue(
            this.ID_ADDITIONAL_DATA_FIELD_TEMPLATE_TXID,
            this.txId
        );
        return this._getValue(this.ID_ADDITIONAL_DATA_FIELD_TEMPLATE, txId);
    }

    getPayload() {
        const payload =
            this._getValue(this.ID_PAYLOAD_FORMAT_INDICATOR, "01") +
            this._getMerchantAccountInfo() +
            this._getValue(this.ID_MERCHANT_CATEGORY_CODE, "0000") +
            this._getValue(this.ID_TRANSACTION_CURRENCY, "986") +
            this._getValue(this.ID_TRANSACTION_AMOUNT, this.amount) +
            this._getValue(this.ID_COUNTRY_CODE, "BR") +
            this._getValue(this.ID_MERCHANT_NAME, this.merchantName) +
            this._getValue(this.ID_MERCHANT_CITY, this.merchantCity) +
            this._getAdditionalDataFieldTemplate();

        return payload + this._getCRC16(payload);
    }

    _getCRC16(payload: string) {
        function ord(str: string) {
            return str.charCodeAt(0);
        }
        function dechex(n: number): string {
            if (n < 0) {
                n = 0xffffffff + n + 1;
            }
            return parseInt(n as unknown as string, 10).toString(16);
        }

        //ADICIONA DADOS GERAIS NO PAYLOAD
        payload = payload + this.ID_CRC16 + "04";

        //DADOS DEFINIDOS PELO BACEN
        const polinomio = 0x1021;
        let resultado = 0xffff;
        let length;

        //CHECKSUM
        if ((length = payload.length) > 0) {
            for (let offset = 0; offset < length; offset++) {
                resultado ^= ord(payload[offset]) << 8;
                for (let bitwise = 0; bitwise < 8; bitwise++) {
                    if ((resultado <<= 1) & 0x10000) resultado ^= polinomio;
                    resultado &= 0xffff;
                }
            }
        }

        //RETORNA CÓDIGO CRC16 DE 4 CARACTERES
        return this.ID_CRC16 + "04" + dechex(resultado).toUpperCase();
    }
};
