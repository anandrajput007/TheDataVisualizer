import { Component,Output,EventEmitter  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {
  @Output() fileUploaded = new EventEmitter<any[]>();
  public files: NgxFileDropEntry[] = [];

  constructor(private http: HttpClient,private apiService: ApiService) {}

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    if (files.length > 1) {
      alert('Please drop only one file at a time.');
      return;
    }

    const droppedFile = files[0];
    if (droppedFile.fileEntry.isFile) {
      const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {
        if (this.isValidFileType(file)) {
          this.uploadFile(file);
        } else {
          alert('Only CSV and Excel files are allowed.');
        }
      });
    } else {
      alert('Directories are not supported.');
    }
  }

  public fileOver(event: any) {
    console.log('File over event:', event);
  }

  public fileLeave(event: any) {
    console.log('File leave event:', event);
  }

  public onFilesSelected(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 1) {
      alert('Please select only one file at a time.');
      return;
    }

    const file = files[0];
    if (this.isValidFileType(file)) {
      this.uploadFile(file);
    } else {
      alert('Only CSV and Excel files are allowed.');
    }
  }

  private isValidFileType(file: File): boolean {
    const allowedTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    return allowedTypes.includes(file.type);
  }

  private uploadFile(file: File): void {
    const formData = new FormData();
    formData.append('file', file);

    this.apiService.post<any[]>('api/FileReader/upload', formData).subscribe(
      (response: any[]) => {
        this.fileUploaded.emit(response); // Emit the response data
        console.log('Upload successful:', response);
      },
      (error) => {
        console.error('Upload failed:', error);
      }
    );
  }
}
