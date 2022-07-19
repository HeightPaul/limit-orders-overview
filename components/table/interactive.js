/* eslint-disable no-undef */
export function interactive(){
   new simpleDatatables.DataTable('#ordersTable', {
      searchable: true,
      perPage: 50,
      perPageSelect: [50, 100]
   });
}
