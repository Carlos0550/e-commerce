import { showNotification } from "@mantine/notifications";
import { useRef, useState } from "react";

function useBannerForm() {
    const bannerInput = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = () => {
        const file = bannerInput.current?.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    }
    const verifyBannerInput = () => {
        const file = bannerInput.current?.files?.[0];
        return !!file;
    };

    const handleDeleteBanner = () => {
        setPreview(null);
        bannerInput.current!.value = '';
    }

    const onFinish = (e: React.FormEvent) => {
        e.preventDefault()
        if(verifyBannerInput()) {
            console.log("bien")
            return
        }else{
            return showNotification({
                color: "red",
                title: "Error",
                message: "Debes seleccionar una imagen",
                position: "top-right",
                autoClose: 2500
            })
        }
    }
    return {
        bannerInput,
        verifyBannerInput,
        handleFileChange,
        preview,
        handleDeleteBanner,
        onFinish
    };
}

export default useBannerForm
