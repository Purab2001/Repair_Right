import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export function confirmLogout() {
    return Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
      customClass: {
        actions: "flex justify-center gap-4 mt-8",
        confirmButton:
          "swal2-confirm bg-primary hover:bg-secondary text-white rounded px-6 py-2 cursor-pointer",
        cancelButton:
          "swal2-cancel bg-base-200 text-base-content rounded px-6 py-2 cursor-pointer",
        popup: "bg-base-100 text-base-content",
        title: "font-bold",
      },
      buttonsStyling: false,
      reverseButtons: true,
      background: undefined,
    }).then((result) => !!result.isConfirmed);
}

export function confirmDelete(itemName = 'this item') {
    return Swal.fire({
        title: `Delete ${itemName}?`,
        text: `This action cannot be undone.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        customClass: {
            actions: 'flex justify-center gap-4 mt-8',
            confirmButton: 'swal2-confirm bg-red-600 hover:bg-red-700 text-white rounded px-6 py-2 mr-2 cursor-pointer',
            cancelButton: 'swal2-cancel bg-base-200 text-base-content rounded px-6 py-2 ml-2 cursor-pointer',
            popup: 'bg-base-100 text-base-content',
            title: 'font-bold',
        },
        buttonsStyling: false,
        reverseButtons: true,
        background: undefined,
    }).then((result) => !!result.isConfirmed);
}

export function swalRegisterSuccess(userName = '') {
    return Swal.fire({
      title: "Registration Successful!",
      text: userName
        ? `Welcome, ${userName}!`
        : "Your account has been created.",
      icon: "success",
      confirmButtonText: "Get Started",
      customClass: {
        confirmButton:
          "swal2-confirm bg-primary hover:bg-secondary text-white rounded px-6 py-2 cursor-pointer",
        popup: "bg-base-100 text-base-content",
        title: "font-bold",
      },
      buttonsStyling: false,
      timer: 1800,
      timerProgressBar: true,
    });
}