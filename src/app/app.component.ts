import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TypeHeadDemo';
  repoSearch = "";
  repoData = new Array;
  showData : boolean = false;
 
  sum = 5;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = "";
  completeData = new Array;
  totalLength : number = 0;
  maxLimit : boolean = false;
  nameData = new Array;
  public staticList = new Array;
  showEmpty : boolean = false;
  public str = "";
  public finalArray = new Array;
  
 

  // public url = "https://api.github.com/search/repositories?callback=JSON_CALLBACK&q="+this.repoSearch;
  // public params = {
  //   // client: "youtube"
  // };
  // public query = "";

  constructor(private http : HttpClient) {
    //this.appendItems(0, this.sum);
  }
  // handleResultSelected(result:any) {
  //   console.log(result.data);
  //   this.query = result.data.items.full_name;
  // }

  
  onRepoNameSubmit(value:any){
    
    //Reset all the values here
    this.repoData = [];
    this.completeData = [];
    this.totalLength = 0;
    this.sum = 5;
    this.maxLimit = false;

    var repoToSearch = value;
    this.getRepoList(value).subscribe((data:any)=>{
      this.totalLength = data.items.length
      this.showData = true;
      this.completeData = data.items;

      for(var i =0; i<this.sum; i++){
        if(this.completeData[i] == undefined){
          break;
        }
        else{
          this.repoData.push(this.completeData[i]);
        }
        
      }
      },(error:any)=>{
        this.showEmpty = true;
        console.log(error);
     
      }
    );
    
  }


  getRepoList(value:string):Observable<any>{
    const endpoint = "https://api.github.com/search/repositories?q="+value;
    return this.http.get(endpoint);
  }

  onScroll() {
    var next : number = 0;
    if(this.sum == this.totalLength || this.sum > this.totalLength){
      //show the max reached limit message
      this.maxLimit = true;
    }
    else{
      //append the next data to the UI element
      next = this.sum +5;
      for(var i = this.sum ; i< next; i++){
        if(this.completeData[i] == undefined){
          break;
        }
        else{
          this.repoData.push(this.completeData[i]);
          this.sum +=1;
        }
        
      }
    }
    
  }

  onKeypressEvent(event:any){
    this.str="";
    this.finalArray = [];
    let myContainer = document.getElementById('browsers') as HTMLInputElement;
    this.getRepoList(event.target.value).subscribe((data:any)=>{
      this.nameData = data.items;
      this.showEmpty = false;
      },(error:any)=>{
        this.showEmpty = true;
      }
    );
   
    for(var i=0; i< this.nameData.length;i++){
      this.finalArray.push(this.nameData[i].full_name);
    }
    for (var i=0; i < this.finalArray.length;++i){
      this.str += '<option value="'+this.finalArray[i]+'" />'; 
    }

    myContainer.innerHTML = this.str;
  }
  
}
