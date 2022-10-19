import DirectoryItem from "../directory-item/directory-item.component"
import {DirectoryContainer} from './directory.styles'


const Directory = ({ categories }) => {
    return (
        <DirectoryContainer>
            {categories.map((category) => (
                <DirectoryItem id={category.id} category={category} />
            ))}
        </DirectoryContainer>
    )
} 

export default Directory;