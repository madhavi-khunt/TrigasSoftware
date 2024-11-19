import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
// import ChecklistIcon from "@mui/icons-material/Checklist";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import RestoreIcon from "@mui/icons-material/Restore";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

import "../assets/css/display.css";
import { Link } from "react-router-dom";

const Display = () => {
  return (
    <>
      <div>
        <div className="d-xl-flex justify-content-between align-items-start">
          <div className="parent">
            {/* 1 */}
            <Link to="/customertable" style={{ textDecoration: "none" }}>
              <div className="child">
                <div className="sub-child">
                  <div className="sub-box1">
                    <div className="s-circle1">
                      <PeopleOutlineIcon />
                    </div>
                    <div className="s-contain">
                      <h1>80</h1>
                      <p>All Customer</p>
                    </div>
                  </div>
                  <div className="sub-box2">
                    <div className="s-line1"></div>
                  </div>
                </div>
              </div>
            </Link>
            {/* 2 */}
            <Link to="/transportertable" style={{ textDecoration: "none" }}>
              <div className="child">
                <div className="sub-child">
                  <div className="sub-box1">
                    <div className="s-circle2">
                      <VerifiedUserIcon />
                    </div>
                    <div className="s-contain">
                      <h1>45</h1>
                      <p>All Transporter</p>
                    </div>
                  </div>
                  <div className="sub-box2">
                    <div className="s-line2"></div>
                  </div>
                </div>
              </div>
            </Link>
            {/* 3 */}
            <Link to="/transactiontable" style={{ textDecoration: "none" }}>
              <div className="child">
                <div className="sub-child">
                  <div className="sub-box1">
                    <div className="s-circle2">
                      <VerifiedUserIcon />
                    </div>
                    <div className="s-contain">
                      <h1>45</h1>
                      <p>All Transaction</p>
                    </div>
                  </div>
                  <div className="sub-box2">
                    <div className="s-line2"></div>
                  </div>
                </div>
              </div>
            </Link>
            {/* 4 */}
            <div className="child">
              <div className="sub-child">
                <div className="sub-box1">
                  <div className="s-circle4">
                    <PendingActionsIcon />
                  </div>
                  <div className="s-contain">
                    <h1>95</h1>
                    <p>Pending Endorsement</p>
                  </div>
                </div>
                <div className="sub-box2">
                  <div className="s-line4"></div>
                </div>
              </div>
            </div>
            {/* 5 */}
            <div className="child">
              <div className="sub-child">
                <div className="sub-box1">
                  <div className="s-circle3">
                    <PublishedWithChangesIcon />
                  </div>
                  <div className="s-contain">
                    <h1>73</h1>
                    <p>Permission Renewal</p>
                  </div>
                </div>
                <div className="sub-box2">
                  <div className="s-line3"></div>
                </div>
              </div>
            </div>
            {/* 6 */}
            <div className="child">
              <div className="sub-child">
                <div className="sub-box1">
                  <div className="s-circle4">
                    <RestoreIcon />
                  </div>
                  <div className="s-contain">
                    <h1>82</h1>
                    <p>License Renewal</p>
                  </div>
                </div>
                <div className="sub-box2">
                  <div className="s-line4"></div>
                </div>
              </div>
            </div>
            {/* 7 */}
            <Link to="/rule18table" style={{ textDecoration: "none" }}>
              <div className="child">
                <div className="sub-child">
                  <div className="sub-box1">
                    <div className="s-circle1">
                      <HistoryToggleOffIcon />
                    </div>
                    <div className="s-contain">
                      <h1>60</h1>
                      <p>Due Certification Under Rule 18</p>
                    </div>
                  </div>
                  <div className="sub-box2">
                    <div className="s-line1"></div>
                  </div>
                </div>
              </div>
            </Link>
            {/* 8 */}
            <Link to="/rule19table" style={{ textDecoration: "none" }}>
              <div className="child">
                <div className="sub-child">
                  <div className="sub-box1">
                    <div className="s-circle3">
                      <HourglassEmptyIcon />
                    </div>
                    <div className="s-contain">
                      <h1>56</h1>
                      <p>Due Certification Under Rule 19</p>
                    </div>
                  </div>
                  <div className="sub-box2">
                    <div className="s-line3"></div>
                  </div>
                </div>
              </div>
            </Link>
            {/* 9 */}
            <div className="child">
              <div className="sub-child">
                <div className="sub-box1">
                  <div className="s-circle2">
                    <SaveAltIcon />
                  </div>
                  <div className="s-contain">
                    <h1>43</h1>
                    <p>NOC Under Process</p>
                  </div>
                </div>
                <div className="sub-box2">
                  <div className="s-line2"></div>
                </div>
              </div>
            </div>

            <div className="child1">
              {/* <div className="sub-child">
                  <div className="sub-box1">
                    <div className="s-circle2">
                   <PiCertificateFill />
                    </div>
                    <div className="s-contain">
                      <h1>43</h1>
                      <p>Due Certification Under 19</p>
                    </div>
                  </div>
                  <div className="sub-box2">
                    <div className="s-line2"></div>
                  </div>
                </div> */}
            </div>

            <div className="child1">
              {/* <div className="sub-child">
                  <div className="sub-box1">
                    <div className="s-circle2">
                   <PiCertificateFill />
                    </div>
                    <div className="s-contain">
                      <h1>43</h1>
                      <p>Due Certification Under 19</p>
                    </div>
                  </div>
                  <div className="sub-box2">
                    <div className="s-line2"></div>
                  </div>
                </div> */}
            </div>

            <div className="child1">
              {/* <div className="sub-child">
                  <div className="sub-box1">
                    <div className="s-circle2">
                   <PiCertificateFill />
                    </div>
                    <div className="s-contain">
                      <h1>43</h1>
                      <p>Due Certification Under 19</p>
                    </div>
                  </div>
                  <div className="sub-box2">
                    <div className="s-line2"></div>
                  </div>
                </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Display;
