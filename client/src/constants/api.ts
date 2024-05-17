//export const BASE_URL :string = "http://localhost:8000/api"
export const BASE_URL :string = "https://saifi-stable-main.onrender.com/api"


export const clientsRoute = "/client"
export const horsesRoute = "/hourse"
export const instructorsRoute = "/instractor"
export const authRoute = "/auth"
export const updateAdminRoute = `${authRoute}/update-admin`
export const getAdminRoute = `${authRoute}/get-admin` 
export const memberShipStatusesRoute = '/membership-status'
export const horseCategoriesRoute = "/hourse-category"
export const memberShipTypesRoute = "/membershipType"
export const cafeteriaRoute = "/caveteria"
export const cafeteriaMenuItemRoute = `${cafeteriaRoute}/menuitem`
export const cafeteriaConsumedItemRoute = `${cafeteriaRoute}/consume`
export const inventoryRoute = '/inventory'
export const inventoryItemsRoute = `${inventoryRoute}/inventoryitem`
export const inventoryConsumedItemsRoute = `${inventoryRoute}/InvConsume`
export const individualMembershipRoute = `/invmembership`
export const familyMembershipRoute = `/familymembership`
export const packagesRoute = "/package"
export const medicineMedicalRoute = "/medicine"
export const consumedMedicalRoute = "/consumed-medicine"
export const dailyRoute = "/daily"
export const scheduleRoute  = "/schadual"
export const invoiceRoute = "/invoice"

export const clientImageUploadRoute = `${clientsRoute}/upload-image`
export const userAvatarUploadRoute = `${authRoute}/uploads`
export const horsesImageUploadRoute = `${horsesRoute}/upload-image`
export const instructorsImageUploadRoute = `${instructorsRoute}/upload-image`