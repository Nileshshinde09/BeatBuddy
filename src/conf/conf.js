const conf={
    appwriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBuckedId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    backendURL:String(import.meta.env.VITE_BACKEND_URL),
}

export default conf;
