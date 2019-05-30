import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { theme } from 'styles/styled-components';

export interface ISearchBarProps {
  isOpen: boolean;
  onOpenClick?: () => void;
  onCloseClick?: () => void;
}

/*interface IContainerProps {
  width?: string;
  height?: string;
}*/
const CollapsedContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 15px;
  cursor: pointer;
  svg {
    transition: all 200ms ease-in-out;
    color: ${theme.default.light};
  }

  &:hover {
    svg {
      color: ${theme.default.primary};
    }
  }
`;

//Container for when the search bar is active
const ActiveContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(15, 15, 15, 0.2);
  z-index: 99;
  transition: all 250ms ease-in-out;
`;

const SearchWrapper = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  -ms-flex-align: center;
  align-items: center;
  margin-top: 5em;
`;

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;
`;

const SearchIconContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 40px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    color: ${theme.default.light};
  }
`;

const CloseIconContainer = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 40px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.default.light};

  svg {
    cursor: pointer;
    transition: all 160ms ease-in-out;
    &:hover {
      color: ${theme.default.dark};
    }
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 2.5em;
  background-color: #fff;
  outline: none;
  border: 0;
  /* box-shadow: 0px 3px 20px 3px rgba(15,15,15,0.7); */
  border-radius: 4px 4px 0 0;
  padding: 0 40px;
  font-weight: 400;
  font-size: 14px;
  border-bottom: 1px solid rgba(15, 15, 15, 0.3);
  color: ${theme.default.dark};
  font-family: 'Open Sans', sans-serif;

  &::placeholder {
    color: ${theme.default.semiDark};
    font-size: 13px;
  }

  &:focus {
    svg {
      color: ${theme.default.primary};
    }
  }
`;

const SearchResultContainer = styled.div`
  width: 100%;
  height: 3.5em;
  background-color: #fff;
  outline: none;
  border: 0;
  box-shadow: 0px 3px 20px 3px rgba(15, 15, 15, 0.7);
  border-radius: 0 0 4px 4px;
`;

export default class SearchBar extends React.Component<ISearchBarProps> {
  private renderContainerId = 'search-bar-container';
  private searchInput: HTMLInputElement | null = null;

  componentWillMount() {
    if (!document.getElementById(this.renderContainerId)) {
      const container = document.createElement('div');
      container.setAttribute('id', this.renderContainerId);
      //Add Container on body
      document.body.appendChild(container);
    }
    //Add Close Event Listener
    document.addEventListener('keyup', this.closeSearch.bind(this));
  }

  componentDidMount() {
    //Focus Input on mount
    this.searchInput && (this.searchInput as HTMLInputElement).focus();
    //Remove DOM listener
    document.removeEventListener('keyup', this.closeSearch.bind(this));
  }

  closeSearch(e: any) {
    if (e.key === 'Escape')
      this.props.onCloseClick && this.props.onCloseClick();
  }

  render() {
    const { isOpen } = this.props;

    //Search bar is collapsed
    if (!isOpen)
      return (
        <CollapsedContainer onClick={this.props.onOpenClick}>
          <FontAwesomeIcon icon={faSearch} size="sm" />
        </CollapsedContainer>
      );
    else {
      const search = (
        <ActiveContainer>
          <SearchWrapper>
            <SearchContainer>
              <SearchIconContainer>
                <FontAwesomeIcon icon={faSearch} size="xs" />
              </SearchIconContainer>
              <SearchInput
                placeholder="Type to Search..."
                ref={ref => (this.searchInput = ref)}
              />
              <CloseIconContainer onClick={this.props.onCloseClick}>
                <FontAwesomeIcon icon={faTimes} size="sm" />
              </CloseIconContainer>
            </SearchContainer>
            <SearchResultContainer />
          </SearchWrapper>
        </ActiveContainer>
      );

      return ReactDOM.createPortal(search, document.getElementById(
        this.renderContainerId,
      ) as Element);
    }
  }
}
