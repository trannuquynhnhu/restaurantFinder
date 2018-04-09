import { Component, OnInit, Input, Pipe, PipeTransform } from '@angular/core';


@Pipe({name:'changRating'})
export class RatingPipe implements PipeTransform{
    transform(value:any):any {
        if(value ==1) return "Exellent";
        if(value ==2) return "Good";
        if(value ==3) return "Pretty Good";
        if(value ==4) return "Bad";
        else return "None";
    }

}