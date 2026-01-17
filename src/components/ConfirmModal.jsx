// export default function ConfirmModal({
//   open,
//   title,
//   message,
//   confirmText = "Confirm",
//   onCancel,
//   onConfirm,
// }) {
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-96 shadow-lg animate-modal">
//         <h2 className="text-lg font-semibold mb-3 text-red-600">
//           {title}
//         </h2>

//         <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
//           {message}
//         </p>

//         {/* <div className="flex justify-end gap-3"> */}
//           {/* <button
//             onClick={onCancel}
//             className="px-4 py-2 rounded border hover:bg-gray-100 dark:hover:bg-gray-800"
//           >
//             Cancel
//           </button> */}



//           {/* <button
//             onClick={onConfirm}
//             className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
//           >
//             {confirmText}
//           </button> */}



//           <div className="flex justify-end gap-3">
//   <button onClick={onCancel}>Cancel</button>

//   <button onClick={onConfirm}>
//     Confirm
//   </button>
// </div>

//         </div>
//       </div>
//     </div>
//   );
// }



export default function ConfirmModal({
  open,
  title,
  message,
  confirmText = "Confirm",
  onCancel,
  onConfirm,
  deleting = false, // ✅ added
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-96 shadow-lg animate-modal">
        <h2 className="text-lg font-semibold mb-3 text-red-600">
          {title}
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          {message}
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={deleting}
            className="px-4 py-2 rounded border hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={deleting}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
          >
            {deleting ? "Deleting..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
