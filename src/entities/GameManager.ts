class GameManager {
  private static instance: GameManager;

  private static GeneratedWord: string[] = [];
  private static wordInput: string[] = [];

  public static getInstance(): GameManager {
    if (!this.instance) {
      this.instance = new GameManager();
    }
    return this.instance;
  }
  constructor() {}

  public static addLetter(letter: string): void {
    this.wordInput.push(letter);
  }

  public static removeLetter(): void {
    this.wordInput.pop();
  }

  private static FinishGame(): void {
    if (this.GeneratedWord.length == this.wordInput.length) {
      //run something here to finish
      this.ResetGame();
    }
  }

  private static StartGame(): void {}

  private static ResetGame(): void {
    this.GeneratedWord = [];
    this.wordInput = [];
  }

  public static CanacelGame(): void {
    this.ResetGame();
  }
}
