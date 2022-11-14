/* 파로로 11/14 */

/*
1. 디자인 패턴을 설계할 때는 어떠한 규칙을 준수하는 것이 좋은지?

(1) 단일 책임 원칙 (Single Responsibility Principle : SRP)
=> "클래스는 단 한 개의 책임을 가져야 한다."
=> 객체지향적인 코드를 짜기 위해 최대한 책임을 작게 나누어야 한다는 말에 부합하는 원칙
=> 이를 잘 지키기 위해서는, 클래스 설계를 먼저 하기보다는 어떤 기능(메소드)가 필요한지 생각해본 후 그 메소드들을 누가 실행할지 생각해보면 좋다.

(2) 개방-폐쇄 원칙 (Open-Closed Principle : OCP) 
=> 기능을 변경하거나 확장할 수 있으면서, 그 기능을 사용할 수 있는 코드는 수정하지 않는다.

(3) 리스코프 치환 원칙 (Liskov Substitution Principle : LSP)
=> 상위 타입의 객체를 하위 타입의 객체로 치환해도 상위 타입을 사용하는 프로그램은 정상적으로 동작해야 한다.


2. 현재까지 설계된 디자인 패턴은 무슨 종류들이 있고, 디자인 패턴 설계 원칙을 어떻게 구현했는지?

=> GoF 디자인 패턴 (생성 패턴, 구조 패턴, 행위 패턴)

1) 생성(Creational) 패턴
: 객체 생성에 관련된 패턴
: 객체의 생성과 조합을 캡슐화해 특정 객체가 생성되거나 변경되어도 프로그램 구조에 영향을 크게 받지 않도록 유연성을 제공

- 추상 팩토리
- 빌더 
- 팩토리 메소드
- 프로토타입
- 싱글턴

2) 구조(Structual) 패턴
: 객체의 생성과 조합을 캡슐화해 특정 객체가 생성되거나 변경되어도 프로그램 구조에 영향을 크게 받지 않도록 유연성을 제공
: 예를 들어 서로 다른 인터페이스를 지닌 2개의 객체를 묶어 단일 인터페이스를 제공하거나 객체들을 서로 묶어 새로운 기능을 제공하는 패턴이다.

- 어댑터
- 브릿지
- 컴퍼지트 (composite)
- Decorator
- 퍼사드 (Facade)
- 플라이웨이트 (Flyweight)
- 프록시

3) 행위(Behavioral) 패턴
: 객체나 클래스 사이의 알고리즘이나 책임 분배에 관련된 패턴
: 한 객체가 혼자 수행할 수 없는 작업을 여러 개의 객체로 어떻게 분배하는지, 또 그렇게 하면서도 객체 사이의 결합도를 최소화하는 것에 중점을 둔다.

- 책임 연쇄
- 커맨드
- 인터프리터
- 이터레이터
- 미디에이터
- 메멘토
- 옵저버
- 테이트
- 스트래티지
- 탬플릿 메소드
- 비지터

*/

// 3. 내가 주로 쓰는 개발 환경에서는 어떠한 디자인 패턴을 도입하는게 좋을지?

/* ----> 모듈 사용하기
모듈 : 쉽게 말해서 레고 블록의 블록 하나와 같은 의미
=> 탄탄한 어플리케이션 구조를 만드는데 꼭 필요한 요소

* 모듈을 만드는 방법
- the module pattern
- object literal notation
- AMD modules
- commonJS modules
- ECMAScript Harmony modules

가장 기본적인 방법 : Object literal notation
*/

//object literal
var module = {
  message: "hi",
  getMessage: function () {
    console.log("module 연습 메시지 : ", this.message);
  },
};

module.getMessage(); //hi

//module이란 변수에 중괄호와 함께 프로퍼티와 메소드를 선언하는 형태
// 객체 외부에서 내부 message 변수에 접근이 가능하고, 브라우저에서 노출되는 js는 전역에서 객체 리터럴 방법을 사용하게 되면 보안에 문제가 발생한다!

const phone = {
  battery: 0,
  rechargeBattery: function () {
    battery = 100;
  },
};

phone.rechargeBattery();
phone.battery = 10000;
// => js 특성 상 일반적으로 브라우저에서 사용자에게 직접 노출되기 때문에 보안에 취약할 수밖에 없다. 따라서 위 코드와 같이 글로벌 변수를 선언하는 것을 최대한 피해야 한다.

//다음과 같이 수정 가능
// => 즉시실행함수를 사용하여 객체를 리턴하고 battery 변수를 함수 안에 선언하여 보호하는 방법을 사용!
// 단점 : 계속해서 똑같은 즉시실행함수를 몇 번이고 적어주어야 한다는 단점

const phone2 = (function () {
  let battery = 0;
  return {
    rechargeBattery: function () {
      battery = 100;
    },
    showRemainBattery: function () {
      return battery;
    },
  };
})();
phone2.showRemainBattery(); //0
phone2.rechargeBattery();
phone2.showRemainBattery(); //100

// 최종 개선 방법 : createPhone()을 다시 한번 즉시실행함수로 감싸는 방법 사용
(function phoneBattery() {
  function createPhone() {
    let battery = 0;
    return {
      rechargeBattery: function () {
        battery = 100;
      },
      showRemainBattery: function () {
        return battery;
      },
    };
  }

  const phone3 = createPhone();
  const phone4 = createPhone();
})();

//module pattern

var module = (function () {
  var number = 0; //비공개 변수, 함수 선언 가능

  return {
    //공개 변수, 함수 선언 가능
    getNumber: function () {
      console.log(number);
    },
  };
})();

module.getNumber(); //0
console.log(module.number); //undefined

//익명 함수나 클로저를 통해서 객체 내부 요소들을 캡슐화로 보호 가능

// + 디자인 패턴을 적용한 라이브러리나 모듈 찾아보기

/*
자바 클래스 라이브러리에서 사용하고 있는 어댑터 디자인 패턴
1) Arrays.asList
Arrays의 private 정적 클래스인 ArrayList를 리턴한다.

List <String> list = Arrays.asList(arr);


2) MVC


*/

/*
1) 해당 라이브러리나 모듈은 어떠한 디자인 패턴을 도입했는가?
2) 해당 라이브러리나 모듈은 디자인패턴 설계 원칙을 어떻게 적용했는가?
3) 적용하지 않은 디자인 패턴 설계 원칙이 있나?
4) 만약 적용하지 않은 디자인 패턴 설계 원칙이 있다면, 그것을 보충하기 위해서는 어떻게 해야 하는가? */
