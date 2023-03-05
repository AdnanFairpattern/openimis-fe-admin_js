import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import {
  LocationCity,
  Healing,
  HealingOutlined,
  LocalHospital,
  LocalPharmacy,
  LocalPharmacyOutlined,
  Person,
  PinDrop,
  Tune,
  Search,

} from "@material-ui/icons";
import PermDataSettingIcon from '@mui/icons-material/PermDataSetting';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import PolicyIcon from '@mui/icons-material/Policy';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { formatMessage, MainMenuContribution, withModulesManager, ErrorBoundary } from "@openimis/fe-core";
import {
  RIGHT_PRODUCTS,
  RIGHT_HEALTHFACILITIES,
  RIGHT_PRICELISTMS,
  RIGHT_PRICELISTMI,
  RIGHT_MEDICALSERVICES,
  RIGHT_MEDICALITEMS,
  // RIGHT_ENROLMENTOFFICER,
  // RIGHT_CLAIMADMINISTRATOR,
  RIGHT_USERS,
  RIGHT_LOCATIONS,
} from "../constants";

const ADMIN_MAIN_MENU_CONTRIBUTION_KEY = "admin.MainMenu";




class AdminMainMenu extends Component {
  render() {
    const { rights } = this.props;
    const entries = [];
   
    
    if (rights.includes(RIGHT_PRODUCTS)) {
      entries.push({
        text: formatMessage(this.props.intl, "admin", "menu.productAdd"),
        icon: <ShoppingBasketIcon />,
        route: "/admin/products/new",
      });
    }


    if (rights.includes(RIGHT_PRODUCTS)) {
      entries.push({
        text: formatMessage(this.props.intl, "admin", "menu.products"),
        icon: <Search />,
        route: "/admin/products",
      });
    }
    
   








    
    if (rights.includes(RIGHT_USERS)) {
      entries.push({
        text: formatMessage(this.props.intl, "admin", "menu.users"),
        icon: <Person />,
        route: "/admin/users",
      });
    }
    if (rights.includes(RIGHT_LOCATIONS)) {
      entries.push({
        text: formatMessage(this.props.intl, "admin", "menu.locations"),
        icon: <PinDrop />,
        route: "/location/locations",
      });
    }

    entries.push(
      ...this.props.modulesManager
        .getContribs(ADMIN_MAIN_MENU_CONTRIBUTION_KEY)
        .filter((c) => !c.filter || c.filter(rights)),
    );

    // health 

    
  


 
    if (!entries.length) return null;
    return (
      <>
     
    
       <MainMenuContribution
        {...this.props}
        header={formatMessage(this.props.intl, "admin", "mainMenu")}
        icon={<PermDataSettingIcon />}
        entries={entries}
      />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  rights: !!state.core && !!state.core.user && !!state.core.user.i_user ? state.core.user.i_user.rights : [],
});

export default withModulesManager(injectIntl(connect(mapStateToProps)(AdminMainMenu)));
  