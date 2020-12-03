/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";


// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";

class Notifications extends React.Component {
  notify = place => {
    var color = Math.floor(Math.random() * 5 + 1);
    var type;
    switch (color) {
      case 1:
        type = "primary";
        break;
      case 2:
        type = "success";
        break;
      case 3:
        type = "danger";
        break;
      case 4:
        type = "warning";
        break;
      case 5:
        type = "info";
        break;
      default:
        break;
    }
    var options = {};
    options = {
      place: place,
      message: (
        "Email Sent"
      ),
      type: type,
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7
    };
    this.refs.notificationAlert.notificationAlert(options);
  };
  
  state={
	  subject:'',
	  email:'',
	  message:'',
	  sent:false
  }
  
   
  
  //reset form
  resetForm=()=>{
    this.setState({
		subject:'',
		email:'',
		message:''
	})
	
	setTimeout(()=>{
		this.setState({
			sent:false,
    })
  },3000)
  }
  
  render() {
    return (
      <>
	    <div className="content">
		<div className="react-notification-alert-container">
            <NotificationAlert ref="notificationAlert" />
          </div>
          <Row>
            <Col md="6">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Send Notification</CardTitle>
				</CardHeader>
				<CardBody>
				  <form className="notifyForm" method="POST" action="/notify">
				    <div class="form-group">
					  <h6>Header</h6>
                      <input class="col-lg" 
					    type="text" 
						name="header" 
						placeholder="Horse Alert" 
					  />
					</div>
					<div class="form-group">
    				  <h6>Notification</h6>
    				  <textarea class="col-lg" 
					    rows="5"
						name="message" 
						placeholder="Alert - horse pacing"
					  />
  				    </div>
				    <Button
                      block
                      color="primary"
					  type="submit"
                      onClick={() => this.notify("tc")}
                    >
                    Send Email
                    </Button>
                  </form>
				  </CardBody>
              </Card>
            </Col>
          </Row>
	    </div>
      </>
    );
  }
}

export default Notifications;
