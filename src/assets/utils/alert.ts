import Swal, {SweetAlertIcon} from "sweetalert2";

/**
 * # 얼럿
 * @param title
 * @param html
 * @param confirmButtonText
 * @param cancelButtonText
 * @param icon
 */
export function open(
    html: string,
    title: string = '알림',
    icon?: SweetAlertIcon,
    confirmButtonText: string = '확인',
    cancelButtonText?: string,
) {
    return Swal.fire(Object.assign({
        title,
        html,
        confirmButtonText,
        confirmButtonColor: "#21D2FF",
        returnFocus: false,
        allowOutsideClick: false,
    }, icon && {
        icon
    }, cancelButtonText && {
        cancelButtonText,
        showCancelButton:true,
    }));
}

export function success(
    text: string,
    title: string = '알림',
) {
    return open(text, title, 'success');
}

export function warning(
    text: string,
    title: string = '알림',
) {
    return open(text, title, 'warning');
}

export function error(
    text: string,
    title: string = '알림',
) {
    return open(text, title, 'error');
}

export function info(
    text: string,
    title: string = '알림',
) {
    return open(text, title, 'info');
}

export function custom(options: any) {
    return Swal.fire({
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: true,
        confirmButtonColor: "#21D2FF",
        returnFocus: false,
        allowOutsideClick: false,
        ...options,
    });
}

export function openAlertLink(text: string, buttonText: String, link: string) {
    return custom({
            html: text,
            icon:'info',
            confirmButtonText: buttonText
        })
        .then(result => {
            if (result.value) {
                window.location.href = link;
            }
        });
}

export default {
    open,
    success,
    warning,
    error,
    info,
    custom,
    openAlertLink,
}