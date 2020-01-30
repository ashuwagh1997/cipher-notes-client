import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.css']
})
export class ListNotesComponent implements OnInit {

  notes = null;
  username = "";
  selectedNote = null;
  newNote = false;
  noteOne = { title: '', desc: '' };
  key;
  constructor(private hc: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      queryParams => {
        console.log(queryParams);
        this.username = queryParams.username;
        this.getNotes(queryParams.username)
      }
    )
  }

  cryptNote(key) {
    console.log(key);
    this.selectedNote.title = this.rc4(key, this.selectedNote.title)
    this.selectedNote.desc = this.rc4(key, this.selectedNote.desc)
  }

  cryptNewNote(key) {
    console.log(key);
    this.noteOne.title = this.rc4(key, this.noteOne.title)
    this.noteOne.desc = this.rc4(key, this.noteOne.desc)
  }

  rc4(key, str) {
    var s = [], j = 0, x, res = '';
    for (var i = 0; i < 256; i++) {
      s[i] = i;
    }
    for (i = 0; i < 256; i++) {
      j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
      x = s[i];
      s[i] = s[j];
      s[j] = x;
    }
    i = 0;
    j = 0;
    for (var y = 0; y < str.length; y++) {
      i = (i + 1) % 256;
      j = (j + s[i]) % 256;
      x = s[i];
      s[i] = s[j];
      s[j] = x;
      res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
    }
    return res;
  }

  getNotes(username) {
    console.log(username)
    this.hc.get('http://localhost:3000/apis/readnotes?username=' + username).subscribe(
      data => {
        console.log(data);
        this.notes = data;
      }
    )
  }

  setEditor(note) {
    console.log(note)
    this.selectedNote = note;
    this.newNote = false;
  }

  updateNote() {
    console.log(this.selectedNote);

    this.hc.post('http://localhost:3000/apis/updatenote?id=' + this.selectedNote._id, { title: this.selectedNote.title, desc: this.selectedNote.desc }).subscribe(

      data => {
        console.log(data)

        this.getNotes(this.username);
      }
    )
  }

  deleteNote() {

    this.hc.post('http://localhost:3000/apis/deletenote?id=' + this.selectedNote._id, {}).subscribe(

      data => {
        this.selectedNote = null;

        console.log(data);

        this.getNotes(this.username);
      }
    );
  }

  createNewNote() {
    this.selectedNote = null;
    this.newNote = true;
  }



  saveNoteOne() {
    this.hc.post('http://localhost:3000/apis/createnote?username=' + this.username, this.noteOne).subscribe(
      data => {
        this.getNotes(this.username);
        this.newNote = false;
        this.noteOne = { title: '', desc: '' };
      }
    );
  }

}
