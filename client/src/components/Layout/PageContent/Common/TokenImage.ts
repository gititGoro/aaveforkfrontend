import imageData from '../../../../images/dataimages.json'
import { AssetIcon } from './AssetPage'

export const ImgSrc = (network: string) => {
    const images = imageData.filter(n => n.network === network)

    return (address: string): AssetIcon => {
        if (images.length) {
            const imageBlob = images[0].images
            const token = imageBlob.filter(i => i.address.toLowerCase() === address.toLowerCase())
            if (token.length)
                return token[0]
            return { name: "", BASE64: "" }
        }
        return { name: "", BASE64: "" }
    }
}