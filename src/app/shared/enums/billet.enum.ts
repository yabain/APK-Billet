export enum YBilletState
{
    UN_RESERVED="un_reserved",
    RESERVED="reserved",
    CONFIRMED_UNUSED="confirmed_unused",
    USED="used"
}

export enum YBuyBilletState
{
    WAITING_PAYEMENT="waiting_payement",
    WAITING_CONFIRMATION="waiting_confirmation",
    REJECTED_PAYEMENT="rejected_payement",
    ERROR_PAYEMENT="error_payement"
}