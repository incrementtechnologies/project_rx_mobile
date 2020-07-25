import React, { Component } from 'react';
import {View, Image,TouchableHighlight,Text,ScrollView,FlatList, Dimensions,TouchableOpacity,TextInput} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Thumbnail, List, ListItem, Separator } from 'native-base';
import { connect } from 'react-redux';
import {faUserCircle,faMapMarker, faUniversity,faKaaba,faFilter} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Style from './Style.js';
import { Routes, Color, Helper, BasicStyles } from 'common';
import { Spinner, Empty, SystemNotification } from 'components';
import { MainCard, Feature, Card, MainFeature, PromoCard } from 'components/ProductThumbnail'
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import { Divider } from 'react-native-elements';
import { Colors } from 'react-native/Libraries/NewAppScreen';


const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

class TermsAndConditions extends Component {
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
       <Text style={{fontWeight:'bold',fontSize:25, color: Color.white}}>Terms and Conditions</Text>
       </View>
       <Divider style={{height:3,marginBottom:10}}/>
<View style={{paddingLeft:15,paddingRight:10}}>
    <Text>{`Thank you for choosing Runway Express (“we, us, our”) to provide you (“you, your, yours, user”) with a delivery service, designed to give you easier access to merchants and have items delivered at your front door. You can avail of our services through (i) applications available to download on mobile devices (“Apps”) and at our website https://runwayexpress.co.uk (“Website”), or any other device, collectively being our services to you (“Program”).

In order to access our program, whether or not you are an existing or former user, you confirm that you have read these Terms of Use (“Terms”). Whenever you use our services, you acknowledge that you understand and agree to these Terms, and you also agree to our Privacy and Cookie Policies. We recommend that you print a copy of these Terms for future reference. We may terminate your access to the Services if you breach our Terms.

Unless explicitly stated otherwise, any new features that are added to the current Program, including the release of new tools and resources, shall be subject to these Terms.

These Terms of Use apply to this website and any other website, application, or other online service that links to these Terms of Use, including author websites and online services, however accessed and/or used, that are operated or otherwise made available by Runway Express.

Runway Express (“we”, “us”, or “our”) reserves the right, at our discretion, to change, modify, add, or remove portions of these terms of use at any time. Please check these terms of use periodically for changes. Your continued use of the sites following the posting of changes to these terms of use will mean you accept those changes.

This is a legal agreement between you (“you” or “user”) and us and states the material terms and conditions that govern your use of the program. This agreement, together with all updates, supplements, additional terms, and all of rules and policies collectively constitute and shall be referred to as the “Agreement” between you and Runway Express.

By accessing the program, you agree to be legally bound by this agreement. If you do not agree to the terms of service and conditions of use stated herein, please immediately leave this site.
`}</Text>

       <Text style={{fontWeight:'bold',fontSize:18,paddingTop:10,paddingBottom:5}}>REGISTRATION FOR SERVICES</Text>
    <Text>{`You must register for an account by: providing a username, a valid email address and any other information we may require from time to time (“account”). You are responsible for maintaining the confidentiality of your account details and you are fully responsible for all activities that occur under your account. Your account must be used only by you and any person you share your credentials to. You must immediately notify us via our contact us page of any suspected or actual, unauthorized or fraudulent use of your account or any other breach of security.
You must not use your account to impersonate any individual or business. We reserve the right to delete your profile and suspend or terminate your account if we, acting reasonably, suspect that any information you provide in your profile is untrue, inaccurate or does not comply with our terms.
`}</Text>

       <Text style={{fontWeight:'bold',fontSize:18,paddingTop:10,paddingBottom:5}}>COPYRIGHT AND OWNERSHIP</Text>
    <Text>{`All of the content featured, displayed or offered for sale on the program, including, but not limited to, text, graphics, photographs, images, moving images, sound, illustrations, software and any other content (collectively, the “Content”), is owned by Runway Express, its licensors, vendors and/or its content providers. The program, including but not limited to the design, structure, selection, coordination, expression, “look and feel” and arrangement of such Content, contained on the program is owned, controlled or licensed by Runway Express, and is protected by trade dress, copyright, patent and trademark laws, and various other intellectual property rights and unfair competition laws.

The program may only be used for the intended purpose for which the program is being made available. Except as may be otherwise indicated in specific documents within the program, you are authorized to view, play, print and download documents, audio and video found on our program for personal, informational, and noncommercial purposes only.

You may not modify any of the materials and you may not copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer or sell any information or work contained on the program. Except as permitted under applicable copyright laws, you are responsible for obtaining permission before re-using any copyrighted material that is available on the program. For purposes of these terms, the use of any such material on any other website or networked computer environment is prohibited.

You shall comply with all applicable domestic and international laws, statutes, ordinances and regulations regarding your use of the program. The program, the content and all related rights shall remain the exclusive property of Runway Express and its licensors unless otherwise expressly agreed in writing. You will not remove any copyright, trademark or other proprietary notices from material found on the program.
`}</Text>

       <Text style={{fontWeight:'bold',fontSize:18,paddingTop:10,paddingBottom:5}}>{`LINKS TO THIRD PARTIES & NO ENDORSEMENT`}</Text>
    <Text>{`The Program contains links to other websites controlled by third parties. Runway Express is not responsible for the contents or use of any linked site, or any consequence of making the link. These third-party services are unrelated to the Sites, and your use of such third-party services is subject to the terms and policies of those services.
The Program contains links to other websites controlled by third parties. Runway Express is not responsible for the contents or use of any linked site, or any consequence of making the link. These third-party services are unrelated to the Sites, and your use of such third-party services is subject to the terms and policies of those services.
`}</Text>

       <Text style={{fontWeight:'bold',fontSize:18,paddingTop:10,paddingBottom:5}}>USER CONDUCT</Text>
    <Text>{`You must not misuse our services by knowingly introducing viruses, trojans, worms, logic bombs or other material that is malicious or technologically harmful. You must not attempt to gain unauthorized access to our services, the server(s) on which our services are stored or any server, computer or database connected to our services. You must not attack our site via a denial-of-service attack or a distributed denial-of service attack. By breaching this provision, you would commit a criminal offence under the laws of the Republic of the Philippines. In the event of such a breach, your right to use our services will cease immediately.

You acknowledge and agree that we may preserve user content and may also disclose user content if required to do so by law, or in the good faith belief that such preservation or disclosure is reasonably necessary to: (a) comply with legal process; (b) enforce the terms; (c) respond to claims that any user content violates the rights of third parties; or (d) protect the rights, property, or personal safety of us, our users and the general public.
`}</Text>

       <Text style={{fontWeight:'bold',fontSize:18,paddingTop:10,paddingBottom:5}}>INAPPROPRIATE USE</Text>
    <Text>{`You will not upload, display or otherwise provide on or through the Program any content that: (1) is libelous, defamatory, abusive, threatening, harassing, hateful, offensive or otherwise violates any law or infringes upon the right of any third party (including copyright, trademark, privacy, publicity or other personal or proprietary rights); or (2) in Runway Express judgment, is objectionable or which restricts or inhibits any other person from using the Program or which may expose Runway Express or its users to any harm or liability of any kind.`}</Text>

       <Text style={{fontWeight:'bold',fontSize:18,paddingTop:10,paddingBottom:5}}>IDEMNIFICATION</Text>
    <Text>{`You agree to defend, indemnify and hold harmless Runway Express and its directors, officers, employees, contractors, agents, suppliers, licensors, successors and assigns, from and against any and all losses, claims, causes of action, obligations, liabilities and damages whatsoever, including attorneys’ fees, arising out of or relating to your access or use of the Program, any false representation made to us, your breach of any of these Terms and Conditions, or any claim that any translation we provide to you is inaccurate, inappropriate or defective in any way whatsoever.`}</Text>
       <Text style={{fontWeight:'bold',fontSize:18,paddingTop:10,paddingBottom:5}}>DELETING YOUR ACCOUNT</Text>
    <Text>{`You can delete your account and terminate your use of the Services at any time by locating the ‘delete profile’ option in the settings section of your Profile. Once you have deleted your Account, your access will be revoked and you will no longer have access to your Profile and we will delete all of the information contained in your Profile. Please be aware that due to technical reasons beyond our control, it might take some time until your personal information disappears completely from search engines (such as Google). We accept no liability for deletion of information or content from your Profile. You acknowledge and accept that certain User Content may remain after the cancellation of your Profile and that the User Content License shall not be revoked or terminated. If you have an active subscription plan when you delete your Account, you will not receive a refund for any time remaining on your subscription.`}</Text>

       <Text style={{fontWeight:'bold',fontSize:18,paddingTop:10,paddingBottom:5}}>TERMINATION OF YOUR ACCOUNT BY US</Text>
    <Text>{`We reserve the right to modify, temporarily suspend or permanently delete your Account and terminate your access to the Services if we have reason to believe that you have breached or acted inconsistently with the Terms.

Following termination, your access will be automatically revoked and we reserve the right to delete your Account, erase all or any information on your Profile and discard any of your User Content. You agree that we shall not be liable to you for any modification or discontinuance of the Service
`}</Text>



</View>





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
)(TermsAndConditions);
