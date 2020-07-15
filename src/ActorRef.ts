import { ActorSignal, Misbehavior } from './Behavior';
import { ActorSystem } from './ActorSystem';
import { Actor } from './Actor';

export interface ActorRef<T> {
  send(message: T): void;
}

export class ActorRef<T> {
  private actor: Actor<T>;
  public name: string;

  constructor(
    behavior: Misbehavior<T>,
    name: string,
    system: ActorSystem<any>
  ) {
    this.name = name;
    this.actor = new Actor(behavior, name, this, system);
  }

  public send(message: T): void {
    this.actor.receive(message);
  }

  public signal(signal: ActorSignal): void {
    this.actor.receiveSignal(signal);
  }
}