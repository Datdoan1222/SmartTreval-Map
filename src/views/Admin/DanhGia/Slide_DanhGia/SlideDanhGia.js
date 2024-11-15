import styled from "styled-components";
import ViewDanhGia from "../View_DanhGia/ViewDanhGia";
const SlideDanhGia = () => {
  return (
    <SlideDanhgia>
      <div className="slideContainer">
        <div className="title"></div>
        <div className="content">
          <table>
            <tr>
              <td>{ViewDanhGia()} </td>
            </tr>
          </table>
        </div>
      </div>
    </SlideDanhgia>
  );
};

export default SlideDanhGia;
const SlideDanhgia = styled.div`
  width: 100%;
  height: 100vh;

  th,
  td {
    text-align: center;
    padding-right: 2vw;
  }
  td:last-child {
    padding-right: 0;
  }

  .iconEdit,
  .iconDelete {
    font-size: 25px;
    cursor: pointer;
  }

  .slideContainer {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .content {
    display: flex;
    align-items: center;
  }

  @media only screen and (max-width: 46.1874em) {
    .content {
      display: flex;
      justify-content: space-between;
    }
    table {
      width: 100vw;
    }
    tr {
      width: 100vw;
    }
  }
`;
