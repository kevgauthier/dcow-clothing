import { useNavigate } from 'react-router-dom';
import {DirectoryItemContainer, BackgroundIMG, Body} from './directory-item.styles.jsx'



const DirectoryItem = ({ category }) => {
    const {imageUrl, title, route } = category;
    const navigate = useNavigate();

    const onNavigateHandler = () => { navigate(route)}

    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
          <BackgroundIMG imageurl={imageUrl} />
          <Body>
              <h2>{title.toUpperCase()}</h2>
              <p>Shop now</p>
          </Body>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem;