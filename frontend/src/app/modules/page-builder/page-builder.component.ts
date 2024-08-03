import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-page-builder',
  templateUrl: './page-builder.component.html',
  styleUrl: './page-builder.component.scss'
})
export class PageBuilderComponent implements OnInit {
  projectId!: string;
  mousePositions: { [key: string]: { x: number, y: number } } = {};

  constructor(private route: ActivatedRoute, private socket: Socket) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id') || '';
    this.socket.emit('joinProject', this.projectId);

    this.socket.on('mouseUpdate', (data: any) => {
      this.mousePositions[data.userId] = data.position;
    });
  }

  onMouseMove(event: MouseEvent) {
    const position = { x: event.clientX, y: event.clientY };
    this.socket.emit('mouseMove', { projectId: this.projectId, position });
  }
}
