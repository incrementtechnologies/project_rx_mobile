import React, { Component } from 'react';
import {View, Image,TouchableHighlight,Text,ScrollView,FlatList, Dimensions,TouchableOpacity,TextInput} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import { connect } from 'react-redux';
import {faUserCircle,faMapMarker, faUniversity,faKaaba,faFilter,faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Style from './Style.js';
import { Routes, Color, Helper, BasicStyles } from 'common';
import { Spinner, Empty, SystemNotification } from 'components';
import { MainCard, Feature, Card, MainFeature, PromoCard } from 'components/ProductThumbnail'
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);



class Privacy extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    }
     
    }
  

  componentDidMount(){
    const { user } = this.props.state;
    if (user != null) {
    }
  }


  render() {
    const {isLoading, data} = this.state;
    const {user} = this.props.state;
    return (
     <ScrollView>
        <View style={{flexDirection:'row',justifyContent:'center',height:70,padding:20,backgroundColor:Color.primary}}>
       <Text style={{fontWeight:'bold',fontSize:25, color: Color.white}}>Privacy Policy</Text>
       </View>
      <View style={{padding:15,}}>
       <Text>We take your privacy very seriously. Any personal information you submit to us when setting up an account shall be subject to our Privacy and Cookie Policies which are incorporated into these Terms. You understand that through your use of the Services, you consent to the collection and use (to the extent stated in the Privacy and Cookie Policies) of this information. You further understand, acknowledge and agree that any personal information you provide on your Profile is in the public domain and is provided at your sole liability. We accept no responsibility whatsoever for the use of any personal information you share on your Profile by you or any other individual.</Text>
      </View>
    <Collapse style={{backgroundColor:Color.white}}>
      <CollapseHeader>
      <Separator bordered style={{height:50,flexDirection:'row',justifyContent:'space-between',marginRight:15}}>
       <Text style={{fontWeight:'bold'}}>WHAT INFORMATION DO WE COLLECT ABOUT YOU?</Text>
       <FontAwesomeIcon icon={faChevronDown}/>
        </Separator>
      </CollapseHeader>
      <CollapseBody>
        <ListItem >
          <Text>{`The information collected when you interact with our Program falls into two categories: \n\n (1) Personal information you voluntarily provide such as your name, address, email address, birthday, address or any other delivery address you provide, business information, business address, and contact number; and  \n\n(2) non-personal information collected through technology, which includes tracking information collected by us as well as third parties.`}</Text>
        </ListItem>
      </CollapseBody>
    </Collapse>

    <Collapse>
      <CollapseHeader>
      <Separator bordered style={{height:70,flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{fontWeight:'bold'}}>{`PERSONAL INFORMATION YOU\nPROVIDE DIRECTLY TO US:`}</Text>
        <FontAwesomeIcon style={{marginLeft:50,paddingLeft:50}} icon={faChevronDown}/>
        </Separator>
      </CollapseHeader>
      <CollapseBody>
        <ListItem style={{flexDirection:'column'}}>
          <Text>{`We may ask you to provide your personal information, demographic information or information about your preferences or interests when you: \n \n•	Register for an account on the Program`}</Text>
         
          
        </ListItem>
      </CollapseBody>
    </Collapse>

{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
    
    <Collapse>
      <CollapseHeader>
      <Separator bordered style={{height:70,flexDirection:'row',justifyContent:'space-between',marginRight:15}}>
        <Text style={{fontWeight:'bold'}}>{`NON-PERSONAL INFORMATION COLLECTED\nUSING TECHNOLOGY:`}</Text>
        <FontAwesomeIcon icon={faChevronDown}/>
        </Separator>
      </CollapseHeader>
      <CollapseBody>
        <ListItem>
          <Text>{`In addition to any information you provide directly to us, we and our third party service providers may use a variety of technologies that automatically collect certain tracking information when you interact with the Program or emails sent to you. By using our Program, you consent to our use of tracking technologies as described below:\n`}</Text>
          
        </ListItem>
        <ListItem style={{flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
          <Text style={{fontWeight:'bold'}}>Device Information</Text>
          <Text>{`We may collect certain information about your computer or other device that you use to access the Program, including IP address, type, browser language, and location`}</Text>
        </ListItem>
        <ListItem style={{flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
          <Text style={{fontWeight:'bold'}}>Usage Information</Text>
          <Text>{`We may log certain information about your use of the Program (e.g., log files, clickstream data, a reading history of the pages you view, your search terms and search results) and additional “traffic data” (e.g., time of access, date of access, software crash reports, session identification number, access times, referring website addresses).`}</Text>
        </ListItem>
        <ListItem style={{flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
          <Text style={{fontWeight:'bold'}}>Cookies</Text>
          <Text>{`Runway Express may place, view, and/or use cookies, web beacons, local storage objects or similar technologies to collect information about your use of the Program and other websites. This information may include information about the web pages you view, the links you click and other actions you take on our Program and in response to our advertising or email newsletters. Runway Express uses the information collected for various reasons, including to remember you and your preferences, track your use of our Program, manage access to and use of the Program, and provide a personalized experience.

A “cookie” is a small text file stored on your computer or other device when you visit certain web pages that record your preferences and actions. Most web browsers automatically accept cookies, but, if you prefer, you can usually modify your browser setting to decline cookies. However, please note that refusing a cookie may limit your access to or use of the Sites.
`}</Text>
        </ListItem>
      </CollapseBody>
    </Collapse>

{/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
    
    <Collapse>
      <CollapseHeader>
      <Separator bordered style={{height:50,flexDirection:'row',justifyContent:'space-between',marginRight:15}}>
        <Text style={{fontWeight:'bold',fontSize:13}}>SHARING YOUR PERSONAL DATA WITH THIRD PARTIES</Text>
        <FontAwesomeIcon icon={faChevronDown}/>
        </Separator>
      </CollapseHeader>
      <CollapseBody>
        <ListItem >
    <Text>{`Runway Express shares your personal data only when it is necessary to offer the Service, legally required, or permitted by you.

We will provide personal data to hosting providers such as Amazon Web Services, and search engine providers such as Google.

These data processors help us bring you the Service. For example, we may share your information in order to detect where or how you encountered a bug when using our mobile application. In connection with these operations, our service providers will have access to personal data for a limited time. When we utilize service providers for processing any personal data, we implement contractual protections limiting the use of that personal data to the provision of services to Runway Express.

We will be required to access and disclose personal data in response to lawful requests, such as subpoenas or court orders, or in compliance with applicable laws. Additionally, we will access and share account or other personal data when we believe it is necessary to comply with law, to protect our interests or property, to prevent fraud or other illegal activity perpetrated through the Service, or to prevent imminent harm. This will include accessing and sharing personal data with other companies, lawyers, agents or government agencies.

If the ownership of all or substantially all of the Runway Express business, or individual business units or assets owned by Runway Express that are related to the Service, were to change, your personal data will be transferred to the new owner. In any such transfer of information, your personal data would remain subject to this section.

Runway Express will share aggregate or anonymous data collected through the Service, including Activity Data, for purposes such as understanding or improving the service.
`}</Text>
        </ListItem>
        <ListItem style={{flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}}>
          <Text style={{fontWeight:'bold'}}>	DATA SUBJECT RIGHTS AND DATA RETENTION</Text>
          <Text>{`You can manage your account settings by clicking here, to update, amend, and correct your information.

You also have the following rights in relation to the personal data we hold about you, unless provided otherwise by local law:\n
•	To request access to, or erasure of, the personal data we hold about you\n
•	To request us to restrict the processing of the personal data we hold about you.\n
•	To hold to us processing personal data relating to you\n
•	Where you have given us consent to process your personal data, you have the right to withdraw that consent at any time.\n
•	To export the personal data you have provided to Runway Express in a format that can be transferred electronically to a third party.\n
•	To delete your account with Runway Express by following the instructions available through the service.\n
Runway Express will retain your data until your account is deleted, after which point we will retain anonymous data collected through the Service, including Activity Data, which may be used by Runway Express and shared with third parties in any manner.

Please note that some of these rights are not absolute. In some cases, we may refuse a request to exercise particular rights if complying with it means that we are no longer able to meet our contractual obligation to provide you with particular products and services. We will keep you informed as to the actions that we can take when you make your request.
`}</Text>
        </ListItem>
      </CollapseBody>
    </Collapse>

    <Collapse>
      <CollapseHeader>
      <Separator bordered style={{height:50,flexDirection:'row',justifyContent:'space-between',marginRight:15}}>
        <Text style={{fontWeight:'bold'}}>THIRD PARTY WEBSITES AND LINKS</Text>
        <FontAwesomeIcon icon={faChevronDown}/>
        </Separator>
      </CollapseHeader>
      <CollapseBody>
        <ListItem >
    <Text>{`Please note that you may have cookies placed on your computer by third party websites that refer you to our Service. Although we do not share your personal data with these third-party websites unless it is reasonably necessary to offer the Service, they may be able to link certain non-personally identifiable information we transfer to them with personal data they previously collected from you. Please review the privacy policies of each website you visit to better understand their privacy practices. In addition, Runway Express would like to inform you that anytime you click on links (including advertising banners), which take you to third party websites, you will be subject to the third parties’ privacy policies. Any information submitted by you directly to these third parties is subject to that third party’s privacy policy.`}</Text>
        </ListItem>
      </CollapseBody>
    </Collapse>

    <Collapse>
      <CollapseHeader>
      <Separator bordered style={{height:50,flexDirection:'row',justifyContent:'space-between',marginRight:15}}>
        <Text style={{fontWeight:'bold'}}>LINKS</Text>
        <FontAwesomeIcon icon={faChevronDown}/>
        </Separator>
      </CollapseHeader>
      <CollapseBody>
        <ListItem >
          <Text>{`The Service may contain links to other websites. We are not responsible for the privacy practices of other websites. We encourage users to be aware when they leave the Service to read the privacy statements of other websites that collect personally identifiable information. This Privacy Policy applies only to information collected by Runway Express via the Service.`}</Text>
        </ListItem>
      </CollapseBody>
    </Collapse>

    <Collapse>
      <CollapseHeader>
      <Separator bordered style={{height:50,flexDirection:'row',justifyContent:'space-between',marginRight:15}}>
        <Text style={{fontWeight:'bold'}}>INFORMATION SECURITY</Text>
        <FontAwesomeIcon icon={faChevronDown}/>
        </Separator>
      </CollapseHeader>
      <CollapseBody>
        <ListItem >
          <Text>{`Runway Express has implemented administrative and technical safeguards it believes are appropriate to protect the confidentiality, integrity and availability of your personal data, User Photo, and access credentials. However, given sufficient resources, a determined attacker could defeat those safeguards and may, as a result, gain access to the data we seek to protect.`}</Text>
        </ListItem>
      </CollapseBody>
    </Collapse>

    <Collapse>
      <CollapseHeader>
      <Separator bordered style={{height:50,flexDirection:'row',justifyContent:'space-between',marginRight:15}}>
        <Text style={{fontWeight:'bold'}}>DO NOT TRACK</Text>
        <FontAwesomeIcon icon={faChevronDown}/>
        </Separator>
      </CollapseHeader>
      <CollapseBody>
        <ListItem >
          <Text>{`The Service is not designed to respond to “do not track” signals sent by some browsers.`}</Text>
        </ListItem>
      </CollapseBody>
    </Collapse>

    <Collapse>
      <CollapseHeader>
      <Separator bordered style={{height:50,flexDirection:'row',justifyContent:'space-between',marginRight:15}}>
        <Text style={{fontWeight:'bold'}}>CONTACT US</Text> 
        <FontAwesomeIcon icon={faChevronDown}/>      
         </Separator>
      </CollapseHeader>
      <CollapseBody>
        <ListItem >
          <Text>{`For all data privacy and support inquiries and any questions or concerns you have about this Privacy Policy, please contact Runway Express here support@runwayexpress.com.`}</Text>
        </ListItem>
      </CollapseBody>
    </Collapse>
 

      </ScrollView>
    );
  }
}
const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Privacy);
