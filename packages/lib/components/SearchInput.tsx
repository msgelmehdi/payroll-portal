import { SearchIcon } from "@repo/icons";
import { Input } from "antd";
import { ChangeEvent } from "react";
import { styled } from "styled-components";
import { LoadingOutlined } from "@ant-design/icons";

interface SearchInputProps {
  defaultValue?: string;
  placeholder: string;
  isSearchLoading: boolean;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput = ({
  defaultValue,
  placeholder,
  isSearchLoading,
  handleSearchChange,
}: SearchInputProps) => {
  return (
    <StyledSearchInput>
      <Input
        defaultValue={defaultValue}
        className="search-input"
        maxLength={255}
        placeholder={placeholder}
        bordered={false}
        prefix={
          isSearchLoading ? (
            <LoadingOutlined />
          ) : (
            <StyledSearchIcon>
              <SearchIcon />
            </StyledSearchIcon>
          )
        }
        onChange={handleSearchChange}
      />
    </StyledSearchInput>
  );
};

const StyledSearchInput = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 10px;
  width: 45vw;

  .anticon-loading {
    font-size: 18px;
    margin-right: 6px;
  }

  .search-input::placeholder {
    font-weight: 400 !important;
    font-size: 18px !important;
    line-height: 26px !important;
    letter-spacing: -0.015em !important;
    color: #959595 !important;
  }

  .search-input {
    font-weight: 400 !important;
    font-size: 14px !important;
    border-radius: 10px !important;
    background: #fff1ef !important;
  }

  .ant-input-affix-wrapper {
    padding: 5px 10px !important;
  }
`;

const StyledSearchIcon = styled.div`
  margin-right: 6px;
  font-size: 18px;
  display: flex;
`;
