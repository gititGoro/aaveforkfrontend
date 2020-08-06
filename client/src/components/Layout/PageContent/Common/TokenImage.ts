import imageData from '../../../../images/dataimages.json'

export interface ImageType {
    BASE64: string,
    name: string,
    address: string
}

export const ImgSrc = (network: string) => {
    const images = imageData.filter(n => n.network === network)

    return (address: string): ImageType => {
        if (images.length) {
            const imageBlob = images[0].images
            const token = imageBlob.filter(i => i.address.toLowerCase() === address.toLowerCase())
            if (token.length)
                return token[0]
            return { name: "", BASE64: "", address: "" }
        }
        return { name: "", BASE64: "", address: "" }
    }
}



export const RetrieveDataImages = (network: string):ImageType[] => {
    const images = imageData.filter(n => n.network === network)
    return images[0].images
}