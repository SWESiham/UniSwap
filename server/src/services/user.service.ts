import User from "../models/User";
export async function getUserProfile(id: string) {
    return User.findById(id).select("name email faculty department role createdAt");
}

export async function updateUserProfile(id: string, data: {
    name?: string | undefined; faculty?: string | undefined; department?: string | undefined;
}) {
    return User.findByIdAndUpdate(id, { $set: data }, { returnDocument: "after", runValidators: true })
        .select("name email faculty department role createdAt");
}
