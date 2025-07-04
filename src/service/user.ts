// import { fetcher } from "@/lib/fetch";

// class User {
   
//     getApi: (url: string, method: "GET" | "POST" | "PUT", body?: string) => Promise<any>;

//     constructor() {
//         this.getApi = async (url: string, method: "GET" | "POST" | "PUT", body?: string) => {
//             const response = await fetcher(url, {
//                 method: method,
//                 ...(method !== "GET" && { body: body }),
//             })
//             return response
//         }
//     }


//     // static async getUserInfo(userId: string) {
//     //     return await this.getA
//     // }
//     static async updateUserInfo(userData: { name?: string; email?: string; phone?: string; }) { }
//     static async updateProfilePicture(formData: FormData) { }
//     static async getUserLearningProgress() { }
// }