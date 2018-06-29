import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ParticleProvider } from '../../providers/particle/particle';

@IonicPage()
@Component({
  selector: 'page-variable',
  templateUrl: 'variable.html',
})
export class VariablePage {

  public overallstatus: any;
  public movement: any;        // Contains the value of our cloud variable
  public subscribed: boolean = false;
  public subscribed2: boolean = false;
  public subscription: any = null;     // Maintains the subscription variable updates
  public subscription2: any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public particle: ParticleProvider) {
  }

  ionViewDidLoad() {
    // Make sure we are logged in to our Particle account
    if (!this.particle.token) {
    	this.login()
    }
  }

  // Cancel any current subscriptions to our variable
  cancelSubscription() {
    if (this.subscription && this.subscription.cancel) {
        this.subscription.cancel();
    }
    if (this.subscription2 && this.subscription2.cancel) {
      this.subscription2.cancel();
    }
    this.subscription = null;
    this.subscription2 = null;
  }
var1
  ionViewDidEnter() {
    // When entering the page, subscribe to updates to the Particle cloud varibale var1
    if (this.particle.device) {
        this.cancelSubscription();
        this.subscription = this.particle.pollVariable("overallstatus").subscribe(
            (value) => { this.overallstatus = value; this.subscribed = true; },
            (error) => { console.log("Error reading overallstatus"); this.subscribed = false; },
            () => { console.log("Stopped polling overallstatus"); this.subscribed = false; }
        );

        this.subscription2 = this.particle.pollVariable("movement").subscribe(
            (value) => { this.movement= value; this.subscribed2 = true; },
            (error) => { console.log("Error reading mvt"); this.subscribed2 = false; },
            () => { console.log("Stopped polling mvt"); this.subscribed2 = false; }
        );


    }
  }

  login() {
    this.navCtrl.push( LoginPage );
  }

}
